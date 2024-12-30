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
            <div className="h-12 sticky top-0 bg-white flex items-center px-2">
                <button
                    className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                    onClick={addChapter}
                >
                    <i className="bi bi-plus-lg"></i>
                </button>
            </div>
            <div className="grid grid-cols-2">
                <div className="">
                    {content && content.map(chapter => (
                        <Chapter
                            key={chapter.id}
                            chapter={chapter}
                        />
                    ))}
                </div>
                <div className="bg-neutral-100">

                </div>
            </div>
        </Page>
    );
};