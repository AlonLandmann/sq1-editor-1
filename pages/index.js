import Chapter from "@/components/Chapter";
import ChapterPreview from "@/components/ChapterPreview";
import Page from "@/components/Page";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        getContent();
    }, []);

    async function getContent() {
        const res = await window.fetch("/api/get-content");
        const json = await res.json();

        if (json.success) {
            setContent(json.content);
        }
    }

    async function addChapter() {
        const res = await window.fetch("/api/add-chapter", { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    return (
        <Page title="Editor">
            <div className="grid grid-cols-2">
                <div className="h-screen overflow-y-auto no-scrollbar">
                    <div className="h-12 flex items-center gap-3 px-2 bg-neutral-800 text-neutral-100">
                        <div className="font-medium text-xl w-10">
                            M
                        </div>
                        <div className="font-medium text-xl">
                            Measure, Integration, and Real Analysis
                        </div>
                        <div className="flex gap-2 ml-auto">
                            <button
                                className="w-8 h-8 flex items-center justify-center text-sm border border-neutral-600 rounded-sm hover:text-neutral-400"
                                onClick={addChapter}
                            >
                                <i className="bi bi-plus-lg"></i>
                            </button>
                            <div className="w-8 h-8"></div>
                            <div className="w-8 h-8"></div>
                            <div className="w-8 h-8"></div>
                            <div className="w-8 h-8"></div>
                            <div className="w-8 h-8"></div>
                        </div>
                    </div>
                    <div>
                        {content && content.map(chapter => (
                            <Chapter
                                key={"chapter-" + chapter.id}
                                chapter={chapter}
                                setContent={setContent}
                            />
                        ))}
                    </div>
                </div>
                <div className="h-screen overflow-y-auto no-scrollbar p-10 flex flex-col gap-10">
                    {content && content.map(chapter => (
                        <ChapterPreview
                            key={"chapter-preview-" + chapter.id}
                            chapter={chapter}
                        />
                    ))}
                </div>
            </div>
        </Page>
    );
};