"use client"

import { Button } from "@/components/ui/button";
import { getFilesAbt } from "@/lib/service";
import { FileTextIcon } from "@radix-ui/react-icons";
import { useState } from 'react';

export default function DownloadPDF ({ uuid, token, path } : { uuid: string, token: string, path:string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await getFilesAbt(token,uuid);
      console.log(response)
      // Convert the response to Blob
      const pdfBlob = await response.blob();
      console.log(pdfBlob)
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', path); // Set the filename for download

      // Append the link to the body
      document.body.appendChild(link);

      // Programmatically click the link to trigger download
      link.click();

      // Clean up: remove the link and revoke the URL
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Button variant="outline" onClick={handleDownload} disabled={loading} className="flex justify-start h-12 w-full shadow">
      <FileTextIcon className="mr-4 h-4 w-4" />{loading ? 'Sedang mengunduh' : 'Unduh PDF'}
    </Button>
    </>
  );
};
