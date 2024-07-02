import { Card } from '@/components/ui/card';
import { UnggahGambar } from './unggah-gambar'; 
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function FotoProfil({ image } : { image: string }) {
  let gambar = "";
  if(image){
    gambar = image;
  } else {
    gambar = "/avatars/default.jpg"
  }
  return (
    <Card className="p-8 space-y-4">
      {/* <div className="space-y-2">
        <h4>Foto Profil</h4>
      </div> */}
      <div className="flex justify-center">
        <Avatar className="h-40 w-40">
          <AvatarImage key={gambar} src={gambar} alt="profile image" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
      <div className="flex justify-center">
        <UnggahGambar image={image} />
      </div>
    </Card>
  );
}