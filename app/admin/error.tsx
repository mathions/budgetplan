'use client' 
import { Button } from "@/components/ui/button"
import { useEffect } from 'react'
 

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center space-y-4">
        <h4>Terdapat permasalahan koneksi</h4>
        <div className="flex justify-center">
          <Button onClick={() => window.location.reload()}>
            Coba lagi
          </Button>
        </div>
      </div>
    </div>
  )
}