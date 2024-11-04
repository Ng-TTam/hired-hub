import React from "react"; 
// import "./BoxBlock.scss";

function CVItem({cvId, titleBox}) {
    return (
        <div class="col-md-6 col-12 pr-12">
            <div class="box-cv">
                <img 
                    src="https://snapshot.topcv.vn/cv-online/WgJfBwkFWwwBAlBXDg8OAwZUB14CBlIHB1ZRBw736e/1730704437.webp" 
                    data-src="https://snapshot.topcv.vn/cv-online/WgJfBwkFWwwBAlBXDg8OAwZUB14CBlIHB1ZRBw736e/1730704437.webp" 
                    onerror="onErrorImage(this)" 
                    class="img-responsive entered loaded" 
                    data-ll-status="loaded"
                />
                <div class="box-bg">
                    <div class="box-info">
                        <h4 class="title-cv">
                            <a 
                                href={`localhost:3000/cv/view/${cvId}`}
                                target="_blank"
                            >
                                {titleBox}
                            </a>
                            <a 
                                href={`localhost:3000/cv/edit/${cvId}`}
                                class="edit"
                            >
                                <i class="fa-solid fa-pen"></i>
                            </a>
                        </h4>
                        <ul class="action">
                            <li>
                                <a 
                                    data-toggle="modal" 
                                    data-cv-id="b7f21584901e9995dc4f2c010c4f736e" 
                                    data-target="#confirmDelete"
                                >
                                    <i class="fa-regular fa-trash"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CVItem;