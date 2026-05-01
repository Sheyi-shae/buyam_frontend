import { Loader2, X } from "lucide-react"

export default function ConversationHeader({
  isLoading,
  isError,
}: {
  isLoading: boolean
  isError: boolean
}) {
  return (
    <>
      <div className=" flex items-center gap-2 p-2 bg-background">
        {isLoading && (
          <>
            <Loader2 className="animate-spin" />
            <p className="text-sm font-medium">Connecting...</p>
          </>
        )}

        {isError && (
          <>
            <X />
            <p>Error connecting</p>
          </>
        )}
      </div>

      <div className="p-3 border-b mt-1 border-border">
        {!isLoading && !isError && (
          <p className="font-bold text-lg">
            Buy<span className="text-amber-500">am</span>
          </p>
        )}
      </div>
    </>
  )
}