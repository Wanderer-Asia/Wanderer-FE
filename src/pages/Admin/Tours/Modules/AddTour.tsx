/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateTour, createTour, createTourSchema } from "@/utils/apis/tour";

import { differenceInDays, format } from "date-fns";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select as SelectShad,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/utils/utils";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { INewFacilities, getFacilities } from "@/utils/apis/facilities";
import { IAirlines, getAirlines } from "@/utils/apis/airlines";
import { Location, getLocation } from "@/utils/apis/location";
import { useToast } from "@/components/ui/use-toast";

const AddTour = () => {
  const form = useForm<ICreateTour>({
    resolver: zodResolver(createTourSchema),
    defaultValues: {
      title: "",
      location_id: "",
      description: "",
      price: "",
      discount: "",
      admin_fee: "",
      start: undefined,
      finish: undefined,
      quota: "",
      thumbnail: undefined,
      airline_id: "",
      include_facility: [""],
      itinerary: [],
    },
  });

  const { toast } = useToast();

  const animatedComponents = makeAnimated();
  const thumbnailWatch = form.watch("thumbnail");
  const pictureGalleryWatch = form.watch("picture");

  const [tourDuration, setTourDuration] = useState(0);
  const [thumbnailPict, setThumbnailPict] = useState("");
  // const [pictureGallery, setPictureGallery] = useState("");

  const [locations, setLocations] = useState<Location[] | undefined>([]);
  const [facilities, setFacilities] = useState<INewFacilities[] | undefined>(
    [],
  );
  const [airlines, setAirlines] = useState<IAirlines[] | undefined>([]);

  const fetchLocations = async () => {
    try {
      const res = await getLocation("", undefined);

      setLocations(res?.data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const fetchFacilities = async () => {
    try {
      const res = await getFacilities();

      const newFacilities = res?.data.map((data) => {
        return {
          value: data.facility_id.toString(),
          label: data.name,
        };
      });

      setFacilities(newFacilities);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const fetchAirlines = async () => {
    try {
      const res = await getAirlines();

      setAirlines(res?.data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    fetchLocations();
    fetchFacilities();
    fetchAirlines();
    const itineraryWatch = form.watch("itinerary");
    if (itineraryWatch.length > tourDuration) {
      itineraryWatch.splice(
        itineraryWatch.length - tourDuration,
        itineraryWatch.length - tourDuration,
      );
    }

    if (thumbnailWatch?.length > 0) {
      setThumbnailPict(URL.createObjectURL(thumbnailWatch?.[0]));
    }

    const formSubscribe = form.watch((value) => {
      setTourDuration(differenceInDays(value.finish!, value.start!) + 1);
    });

    return () => formSubscribe.unsubscribe();
  }, [form, tourDuration, thumbnailWatch, pictureGalleryWatch]);

  const submitTourHandler = async (data: ICreateTour) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("location_id", data.location_id);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("discount", data.discount as string);
      formData.append("admin_fee", data.admin_fee);
      formData.append("start", data.start.toISOString() as any);
      formData.append("finish", data.finish.toISOString() as any);
      formData.append("airline_id", data.airline_id);
      formData.append("quota", data.quota);
      formData.append("thumbnail", data.thumbnail[0]);

      for (let i = 0; i < data.picture.length; i++) {
        formData.append(`picture`, data.picture[i]);
      }

      for (let i = 0; i < data.include_facility.length; i++) {
        formData.append(
          `include_facility[${i}]`,
          data.include_facility[i] as any,
        );
      }

      for (let i = 0; i < data.itinerary.length; i++) {
        formData.append(
          `itinerary[${i}].location`,
          data.itinerary[i].location as any,
        );
        formData.append(
          `itinerary[${i}].description`,
          data.itinerary[i].description as any,
        );
      }

      const res = await createTour(formData as any);

      toast({
        title: "Success",
        description: res?.message,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="mt-5 w-full lg:w-[800px]">
      <p className="mb-3 text-[22px] font-semibold">Add Tour</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitTourHandler)}>
          <div className="mb-3 flex w-full gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Location</FormLabel>
                  <SelectShad
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations?.map((location) => (
                        <SelectItem
                          value={location?.location_id?.toString()}
                          key={location?.location_id}
                        >
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectShad>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-3 mt-5 w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mb-3 mt-5 flex gap-3">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-[400px]">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="w-[300px]">
                  <FormLabel>Discount (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Discount"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="admin_fee"
              render={({ field }) => (
                <FormItem className="w-[300px]">
                  <FormLabel>Admin fee</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Admin Fee"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-3 mt-5 flex w-full gap-3 lg:w-[800px]">
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Departure Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="finish"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Finish Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="include_facility"
            render={({ field: { onChange, onBlur, name, ref, value } }) => (
              <FormItem className="mb-3 mt-5 w-full">
                <FormLabel>Facility</FormLabel>
                <FormControl>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={facilities}
                    name={name}
                    ref={ref}
                    onBlur={onBlur}
                    onChange={(val) => onChange(val.map((c) => c.value))}
                    value={facilities?.filter((c) => value.includes(c.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="airline_id"
            render={({ field }) => (
              <FormItem className="mb-3 mt-5 w-[300px]">
                <FormLabel>Airline</FormLabel>
                <SelectShad
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Airline" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {airlines?.map((airline) => (
                      <SelectItem
                        value={airline.airline_id.toString()}
                        key={airline.airline_id}
                      >
                        {airline.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectShad>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quota"
            render={({ field }) => (
              <FormItem className="mb-3 mt-5 w-[300px]">
                <FormLabel>Total Pax</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Total Pax"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={() => (
              <FormItem className="mb-3 mt-5 w-[300px]">
                <FormLabel>Thumbnail Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    multiple
                    {...form.register("thumbnail")}
                  />
                </FormControl>
                <FormMessage />
                <img src={thumbnailPict} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="picture"
            render={() => (
              <FormItem className="mb-3 mt-5 w-[300px]">
                <FormLabel>Gallery Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    multiple
                    {...form.register("picture")}
                  />
                </FormControl>
                <FormMessage />
                <div className="h-[200px] w-[400px] border border-dashed">
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="text-neutral-400">Upload Tour Image</p>
                  </div>
                </div>
              </FormItem>
            )}
          />

          <>
            {Array.from({ length: tourDuration }, (_v, k) => (
              <div key={k}>
                <FormField
                  key={k}
                  control={form.control}
                  name={`itinerary.${k}.location`}
                  render={({ field }) => (
                    <FormItem className="mb-3 w-[400px]">
                      <FormLabel>Day {k + 1}</FormLabel>
                      <FormControl>
                        <Input
                          key={field.name}
                          placeholder="Location"
                          className="w-full"
                          {...form.register(`itinerary.${k}.location`)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  key={k + 1}
                  control={form.control}
                  name={`itinerary.${k}.description`}
                  render={({ field }) => (
                    <FormItem className="mb-6 w-full">
                      <FormControl>
                        <Textarea
                          key={field.name}
                          placeholder="Description"
                          className="w-full"
                          {...form.register(`itinerary.${k}.description`)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </>

          <Button
            type="submit"
            className="mb-6 mt-5 w-[200px] bg-yellow-main text-black"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTour;
