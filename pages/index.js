import Page from "@/components/Page";

export default function HomePage() {
  async function addChapter() {
    const res = await fetch("/api/add-chapter", { method: "POST" });
    const json = await res.json();

    if (json.success) {
      window.location.reload();
    }
  }

  return (
    <Page title="Editor">
      <div className="h-12 flex items-center px-2">
        <button
          className="py-1 px-2 text-sm underline hover:text-neutral-500"
          onClick={addChapter}
        >
          Add chapter
        </button>
      </div>
      <div className="grid grid-cols-2">
        <div className="bg-amber-50" style={{ height: "calc(100vh - 48px)" }}>
          
        </div>
        <div className="bg-amber-100" style={{ height: "calc(100vh - 48px)" }}>

        </div>
      </div>
    </Page>
  );
};