"use client"

import { useEffect, useState } from "react";
import { getFilesAbt } from "@/lib/service-admin";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

export function PdfViewer ({ uuid, token} : { uuid: string, token: string}) {
  const [data, setData] = useState("");
  const [isLoading, setLoading] = useState(true)

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchData = async () => {
        const res = await getFilesAbt(token, uuid);
        if (res.ok) {
          const pdfBlob = await res.blob();
          const url = URL.createObjectURL(pdfBlob);
          setData(url);
          setLoading(false)
        }
        else {
          console.log(res.json());
        }
    };
    fetchData();
  }, [token, uuid]);

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  
  return (
    <div className="h-[600px]">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={data} plugins={[defaultLayoutPluginInstance]} />;
      </Worker>
    </div>  
  )
}