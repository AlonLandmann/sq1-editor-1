import { intToRoman } from "@/lib/roman";
import TeX from "./tex/TeX";

export default function PartPreview({ chapterIndex, sectionIndex, unitIndex, part }) {
    return (
        <div>
            <div className="p-2 flex gap-3 items-baseline">
                <div className="w-10 text-base text-center text-neutral-400">
                    {intToRoman(part.index + 1)}
                </div>
                {part.name &&
                    <div>
                        ({part.name})
                    </div>
                }
                <div>
                    <TeX tex={part.content} />
                </div>
            </div>
            {/* {part.proof && <></>} */}
        </div>
    );
};