import Chapter from "@/components/Chapter";
import Page from "@/components/Page";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        getContent();
    }, []);

    async function getContent() {
        const res = await fetch("/api/get-content");
        const json = await res.json();

        if (json.success) {
            setContent(json.content)
        }
    }

    async function addChapter() {
        const res = await fetch("/api/add-chapter", { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    return (
        <Page title="Editor">
            <div className="h-12 sticky top-0 bg-white flex items-center">
                <button
                    className="py-1 px-2 text-sm underline hover:text-neutral-500"
                    onClick={addChapter}
                >
                    Add chapter
                </button>
            </div>
            <div className="grid grid-cols-2">
                <div className="bg-amber-50">
                    {content && content.map(chapter => (
                        <Chapter
                            key={chapter.id}
                            chapter={chapter}
                        />
                    ))}
                </div>
                <div className="bg-amber-100">

                </div>
            </div>
        </Page>
    );
};