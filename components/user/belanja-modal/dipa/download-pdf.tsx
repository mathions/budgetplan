"use client"

import { Button } from "@/components/ui/button";
import { getBrafaks } from "@/lib/service";
import { useState } from 'react';

export default function DownloadPDF ({ slug, token } : { slug: string, token: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const token = '9|yFwif3axhl3FRRXjbeqO2WbjbHLYCTMEqSvvQfXn4f82ab14'
      const slug = 'kbri-berlin-2025'
      const response = await getBrafaks(token,slug);
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
