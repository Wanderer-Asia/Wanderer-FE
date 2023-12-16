import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const PaymentDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="button"
          variant="secondary"
          className=" bg-tyellow hover:bg-tyellowlight"
        >
          Select Payment Method
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className=" items-center">
          <DialogTitle>Select Payment Method</DialogTitle>
        </DialogHeader>
        <div className="wrap mt-5 flex flex-row items-center gap-6">
          <div className="hover:bg-tyellow flex cursor-pointer rounded-sm border border-black p-2 dark:border-white">
            <img
              className="h-6 w-16"
              src="https://s3-alpha-sig.figma.com/img/50a0/851b/812e75c05619a4cde0c3e7bc432f5c29?Expires=1703462400&Signature=eR818RROilPgpwX1GNzVoLUVbtmviFmametU3SDD4HBhkLyBHEb-d-DHATtnZ4DckKLv1NJfPlxoOsFJ5ftJ8eHLUevStrfYGrJSwj3vM~ZisyrA~a~JRBDyirpzYZwylciFpb~bk9XkEVHiRdNSMnsSIyUbLgz6zFqvGYi9Rkb7Yyi1oEAs1regb5nGgaBpyoBF-GCcgvOnCwzXsUgJAa0xT~INqXPO0J~vqYu5vG6hPlcS3u4e9X3NoggfVRPDwanh9IVWLV8U-6haRAF5-oQMdmOkYeDbltQaO6hQZvH2AiZuEXo435L9W7C9OKNZMnrnCkKjLl0lcosato9XEA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
          </div>
          <div className="hover:bg-tyellow flex cursor-pointer rounded-sm border border-black p-2 dark:border-white">
            <img
              className="h-6 w-16"
              src="https://s3-alpha-sig.figma.com/img/adb6/2ac8/647bf1a6c87148864bbb4cd44130da36?Expires=1703462400&Signature=nVaFZxyES07zE7BHBBI092tk73KUhT0aofbMV0O4xKtD7M7GVGZ4ci9E-uftylO4lLr43gdr7MOqpcjzjyryis33c~XNGBnKrEtXdEg8d9aIGhkWFT0kKYa1yUHPXgQJ~Nz4~LPzDw1qu5b~sUVstecsP0LJ2L~yZesxuVeWU97LYbJlwF6t520a0cXev~2iELID3A8NdNFyG3r7PsuLxTKR4-Hat2p9ENIU8~3mfIu468C0YxHxKgZacP9sQLhVUSVkbW2imfcW5fQXBksUF1eNQyZtlcmw4VXpbgFsyN8~uniYwQEwR9FE8JX1ataYiynNJEsMv~YV5H8pGr03UQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
          </div>
          <div className="hover:bg-tyellow flex cursor-pointer rounded-sm border border-black p-2 dark:border-white">
            <img
              className="h-6 w-16"
              src="https://s3-alpha-sig.figma.com/img/e1a4/cd8b/a532510665081e719366b8574a3a12ba?Expires=1703462400&Signature=TnF8KoL-OpmCzoCTwqRaexmGQrYn4Ih5X44S7n~2BNRhAIWTFr6kmRUTa-tnWHeQGpljvX3Wq1bXMuSzYArJ5Yd~jaBTiaIQu0i5sEC1jyohnpwSdANVTA~Sx4dXGvujR6oP-iaYXZqPSdNm2CmwbP2j0nnO6TQSxp9bwBNozMftgQiuvLYFbZB9iv3NFX4ykMNkEPRk1yJhdsol4wm5ZbsKwHRzpnl1-~Hj4gXmzcwiPsJH7O1WBCau7KGp6hbKQbDGrjQ49HpVR-VUbHqE0g7zMvG5omU2-yDyZ6-QBTyOV1XdwS2zn-wZqsaGXKgwm9z3~D0d3Ppi62EvtFkjYg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
          </div>
          <div className="hover:bg-tyellow flex cursor-pointer rounded-sm border border-black p-2 dark:border-white">
            <img
              className="h-6 w-16"
              src="https://s3-alpha-sig.figma.com/img/b3ee/2a72/1ac9c2dc8109129ae737af6f0760eb11?Expires=1703462400&Signature=cJKjPsNmPR6VaY21f9JdpGHzYGdkwF8-1wa8~bDu1j83zHludfCnrf~r8T2pZ4K0s80jEiaxAdhWqIVgUFDE1bP64Pamnb7CWk0MmXV7ws4CxrSq7WR8nrVjWgbquq~EM80W3Uh7~tSQva40M-A5SdyvWdqkpjJq6ygdjpPGyS3NaBgx-V6o16KjJ3IqcnsSuKARGcQ1HkpuoJfbT52Trq-PjqHmCCha39yBCris~2WZ1jp3J3zR7tXS7qaKFtkm7W-NghlQUJ9rdsthCaP0GWrnrbCYEDNas1tZYfj~vWJLrYTBWTgMtFqhBbNLtK8TcfPsNnaNn6Sl-d7IGPjizA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
          </div>
          <div className="hover:bg-tyellow flex cursor-pointer rounded-sm border border-black p-2 dark:border-white">
            <img
              className="h-6 w-16"
              src="https://s3-alpha-sig.figma.com/img/1c85/3775/91c3093ea4a597600a0e87a03cb2a29c?Expires=1703462400&Signature=ahC0muytVf-Ufzka8MsCK2mXWRGudOKDzZHh-tSlBXrgj16LqkqylXalVFEDg5elAutSTzBJnMu6sA12BGX3LCXW6TzvG1lI9MNQbKZ~jliKnYSX3~GRQye6QvSIPmLteswvZHBJX5m2~uBGIrr7e5ikh1MmdR6RUQ6dYqwsk9s~ixm87HrBTwaqilrXlgoogQAMz~sxE1AF-6mamZDxWG8gEJDcW1g45hMVmhTGFmrxwqZ7CPu2de9Fdr1UGCeNFwUZBo6AY0Xp99CgW~FLxGOkxD8ayciCZX5s~cl5xnJJL7VGZfohTFV5VI5GflshTDtmNfR3LfpbIlH0i53XMg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
