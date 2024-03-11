import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setImages } from "@/lib/redux/adSlice";
import { readFileAsync } from "@/utils/readFiles";

const Dropzone = ({ className }) => {
    const filesize = 1024 * 1024;
    const ad = useAppSelector((state) => state.ad);
    const dispatch = useAppDispatch();
    const [rejected, setRejected] = useState([]);

    const onDrop = useCallback(
        async (acceptedFiles, rejectedFiles) => {
            const fileNames = ad.images.map((file) => file.name);
            if (acceptedFiles?.length) {
                const newFiles = acceptedFiles.filter(
                    (file) => !fileNames.includes(file.name)
                );
                const alreadyExistFiles = acceptedFiles.filter((file) =>
                    fileNames.includes(file.name)
                );
                if (newFiles.length > 0) {
                    const acceptedFilesToAdd = newFiles.filter(
                        (file) => file.size < filesize
                    );
                    if (acceptedFilesToAdd.length < newFiles.length) {
                        toast.error("Some files exceed the size limit (1MB)");
                        const rejectedFilesFilter = newFiles.filter(
                            (file) => file.size > filesize
                        );
                        setRejected((previousFiles) => [
                            ...previousFiles,
                            ...rejectedFilesFilter.map((file) =>
                                Object.assign(file, {
                                    preview: URL.createObjectURL(file),
                                })
                            ),
                        ]);
                    } else {
                        const convertedImages = await Promise.all(
                            acceptedFilesToAdd.map(
                                async (file) => await readFileAsync(file)
                            )
                        );
                        dispatch(
                            setImages({
                                images: [...ad.images, ...convertedImages],
                            })
                        );
                    }
                }
                if (alreadyExistFiles.length > 0) {
                    toast.error("Some files already exist");
                }
            }

            if (rejectedFiles?.length) {
                setRejected((previousFiles) => [
                    ...previousFiles,
                    ...rejectedFiles,
                ]);
            }
        },
        [ad.images, filesize]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": [],
        },
        maxSize: 1024 * 1000,
        onDrop,
    });

    useEffect(() => {
        // Revoke the data uris to avoid memory leaks
        return () =>
            ad.images.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [ad.images]);

    const removeFile = (name) => {
        dispatch(
            setImages({
                images: ad.images.filter((file) => file.name !== name),
            })
        );
    };

    const removeAll = () => {
        dispatch(
            setImages({
                images: [],
            })
        );
        setRejected([]);
    };

    const removeRejected = (name) => {
        setRejected((previousFiles) =>
            previousFiles.filter((rejectedFile) => rejectedFile.name !== name)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!files?.length) return;

        // const formData = new FormData();
        // files.forEach((file) => formData.append('file', file));
        // formData.append('upload_preset', 'friendsbook');

        // const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
        // const data = await fetch(URL, {
        //   method: 'POST',
        //   body: formData,
        // }).then((res) => res.json());

        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col"
        >
            <div
                {...getRootProps({
                    className: className,
                })}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-4">
                    <ArrowUpTrayIcon className="w-5 h-5 fill-current" />
                    {isDragActive ? (
                        <p>Drop the files here... (Maximum size is 1MB)</p>
                    ) : (
                        <p>
                            Drag & drop your image here, or click to select
                            files (Maximum size is 1MB)
                        </p>
                    )}
                </div>
            </div>

            {/* Preview */}
            <section className="mt-10">
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={removeAll}
                        className="mt-1 text-[12px] p-2 uppercase tracking-wider font-bold border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:bg-red-600 transition-colors bg-red-500 text-white"
                    >
                        Remove all
                    </button>
                </div>

                {/* Accepted files */}
                {ad.images.length > 0 && (
                    <>
                        <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
                            Accepted Images
                        </h3>
                        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
                            {ad.images.map((file) => (
                                <li
                                    key={file.name}
                                    className="relative h-32 rounded-md shadow-lg"
                                >
                                    <Image
                                        src={file.url}
                                        alt={file.name}
                                        width={500}
                                        height={500}
                                        className="h-full w-full object-contain rounded-md"
                                    />
                                    <button
                                        type="button"
                                        className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                                        onClick={() => removeFile(file.name)}
                                    >
                                        <XMarkIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                                    </button>
                                    <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                                        {file.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {/* Rejected Files */}
                {rejected.length > 0 && (
                    <>
                        <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
                            Rejected Images
                        </h3>
                        <ul className="mt-6 flex flex-col">
                            {rejected.map((file) => {
                                return (
                                    <li
                                        key={file.name}
                                        className="flex items-start justify-between"
                                    >
                                        <div>
                                            <p className="mt-2 text-neutral-500 text-sm font-medium">
                                                {file.name}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border 
                                    border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                                            onClick={() =>
                                                removeRejected(file.name)
                                            }
                                        >
                                            remove
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </section>
        </form>
    );
};

export default Dropzone;
