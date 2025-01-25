export function MessagePreview() {
  return (
    <div className="w-full max-w-md mx-auto rounded-lg border bg-card text-card-foreground shadow-lg dark:border-white/50">
      <div className="flex items-center gap-2 border-b px-4 py-2 dark:border-white/50">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Live</span>
          <div className="h-2 w-2 rounded-full bg-purple-500" />
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-purple-600 text-white">
            A
          </div>
          <div className="rounded-lg bg-muted px-4 py-2">
            <p className="">Send anonymous messages securely! 🔒</p>
          </div>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <div className="rounded-lg bg-purple-600 px-4 py-2 text-white">
            <p>Your privacy is our priority! ✨</p>
          </div>
        </div>
      </div>
    </div>
  );
}
