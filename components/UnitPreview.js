import { useState } from "react";
import Paragraph from "./Paragraph";
import PartPreview from "./PartPreview";
import TeX from "./tex/TeX";

export default function UnitPreview({ chapterIndex, sectionIndex, unit }) {
    const [proofInView, setProofInView] = useState(false);

    if (unit.type === "paragraph") {
        return <Paragraph unit={unit} />;
    }

    return (
        <div className="border rounded-sm px-[24px] py-4">
            <div className="flex items-center text-neutral-400 mb-2">
                <div className="mr-3">
                    {unit.type.charAt(0).toUpperCase()}{unit.type.slice(1)}
                </div>
                <div className="mr-6">
                    {unit.number}
                </div>
                <div>
                    {unit.name}
                </div>
                {unit.proof &&
                    <div
                        className="ml-auto transition text-sm text-neutral-300 hover:text-neutral-400 cursor-pointer"
                        onClick={() => setProofInView(p => !p)}
                    >
                        {proofInView
                            ? <i className="bi bi-chevron-down"></i>
                            : <i className="bi bi-chevron-left"></i>
                        }
                    </div>
                }
            </div>
            <div>
                <TeX tex={unit.content} />
            </div>
            {unit.proof && proofInView &&
                <div className="pt-4">
                    <hr />
                    <div className="pt-4">
                        <strong>proof</strong>.{" "}
                        <TeX tex={unit.proof} />
                        <div className="flex justify-end">
                            <i className="bi bi-square-fill text-[9px] text-neutral-200"></i>
                        </div>
                    </div>
                </div>
            }
            {unit.parts.length > 0 &&
                <div className="flex flex-col gap-[2px] mt-2">
                    {unit.parts.map(part => (
                        <PartPreview
                            key={part.id}
                            chapterIndex={chapterIndex}
                            sectionIndex={sectionIndex}
                            unitIndex={unit.index}
                            part={part}
                        />
                    ))}
                </div>
            }
        </div>
    );
};