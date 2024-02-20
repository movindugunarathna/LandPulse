import { useEffect, useRef, useState } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/scss/lg-thumbnail.scss";

export default function ImageComponent() {
    const containerRef = useRef(null);
    const [galleryContainer, setGalleryContainer] = useState(null);

    useEffect(() => {
        if (containerRef.current) {
            setGalleryContainer("aaa");
        }
    }, []);

    const onInit = (detail) => {
        if (detail) {
            detail.instance.openGallery();
        }
    };

    return (
        <div>
            <div
                style={{
                    height: "800px",
                }}
                ref={containerRef}
            ></div>
            <div>
                <LightGallery
                    container={containerRef.current}
                    onInit={onInit}
                    plugins={[lgZoom, lgThumbnail]}
                    closable={false}
                    showMaximizeIcon={true}
                    slideDelay={400}
                    thumbWidth={130}
                    thumbHeight={"100px"}
                    thumbMargin={6}
                    appendSubHtmlTo={".lg-item"}
                    dynamic={true}
                    dynamicEl={[
                        {
                            src: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
                            responsive:
                                "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80 800",
                            thumb: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
                            subHtml: `<div class="lightGallery-captions">
                            <h4>Photo by <a href="https://unsplash.com/@dann">Dan</a></h4>
                            <p>Published on November 13, 2018</p>
                        </div>`,
                        },
                        {
                            src: "https://images.unsplash.com/photo-1571292064306-669f0e758231?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
                            responsive:
                                "https://images.unsplash.com/photo-1571292064306-669f0e758231?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1571292064306-669f0e758231?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80 800",
                            thumb: "https://images.unsplash.com/photo-1571292064306-669f0e758231?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
                            subHtml: `<div class="lightGallery-captions">
                                        <h4>Photo by <a href="https://unsplash.com/@jalanmeier">J. Meier</a></h4>
                                        <p>Published on October 17, 2019</p>
                                    </div>`,
                        },
                        {
                            src: "https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80",
                            responsive:
                                "https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80 800",
                            thumb: "https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80",
                            subHtml: `<div class="lightGallery-captions">
                                        <h4>Photo by <a href="https://unsplash.com/@brookecagle">Brooke Cagle</a></h4>
                                        <p>Published on October 6, 2020</p>
                                    </div>`,
                        },
                        // Add other dynamicEl objects here
                        ,
                    ]}
                    hash={false}
                    elementClassNames={"inline-gallery-container"}
                ></LightGallery>
            </div>
        </div>
    );
}
