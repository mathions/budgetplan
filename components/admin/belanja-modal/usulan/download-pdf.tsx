"use client"

import { Button } from "@/components/ui/button";
import { getBrafaks } from "@/lib/service-admin";
import { useState } from 'react';

export default function DownloadPDF ({ uuid, token } : { uuid: string, token: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await getBrafaks(token,uuid);
      console.log(response)
      // Convert the response to Blob
      const pdfBlob = await response.blob();
      console.log(pdfBlob)
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); // Set the filename for download

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
    <div>
    <Button onClick={handleDownload} disabled={loading}>
    {loading ? 'Downloading...' : 'Download PDF'}
    </Button>
    </div>
    </>
  );
};
