import { Card } from '@/components/ui/card';
import { UnggahGambar } from './unggah-gambar'; 
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function FotoProfil({ image } : { image: string }) {
  return (
    <Card className="p-8 space-y-4">
      {/* <div className="space-y-2">
        <h4>Foto Profil</h4>
      </div> */}
      <div className="flex justify-center">
        <Avatar className="h-40 w-40">
          <AvatarImage key={image} src={image} alt="profile image" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
      <div className="flex justify-center">
        <UnggahGambar image={image} />
      </div>
    </Card>
  );
}