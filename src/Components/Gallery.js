import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Pagination from "./Pagination";
import Footer from "./Footer";

export default function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage, setImagesPerPage] = useState(12);
    const [isImagePopUp, setIsImagePopUp] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    let imagePopUpRef = useRef();
    let delayTime = 0;
    let savedPage = parseInt(sessionStorage.getItem('myPage'))

    useEffect(() => {
        fetch('https://aster-app.onrender.com/galleries')
        .then((r) => r.json())
        .then((data) => {
            setGallery(data);
            setCurrentPage(savedPage ? savedPage : 1);
        })
    },[])

    useEffect(() => {
        let handler = e => {
            if(!imagePopUpRef.current.contains(e.target)) {
                setIsImagePopUp(false);
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })
    
    const totalImages = gallery.length;
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = gallery.slice(indexOfFirstImage, indexOfLastImage);

    function handlePages(num) {
        setCurrentPage(num);
        sessionStorage.setItem('myPage', num)
    }

    function handleImageClick(image) {
        setSelectedImage(image);
        setIsImagePopUp(true);
    }

    console.log(currentPage);

    return (
        <div className="background-color container">
            <div className="gallery" id="gallery" >
                <div className="gallery-headline-container flex-box" id="gallery-headline-container">
                    {/* <div className="upload-link">
                        <p>SHARE YOURS +</p>
                    </div> */}
                    <div className="tag-charcoal">
                        <p>MOMENTS</p>
                    </div>

                    <div className="gallery-headline">
                        <h1>GALLERY</h1>
                    </div>
                </div>

                <div className="gallery-container">
                    {currentImages.map((image) => {
                        delayTime = delayTime + .2;
                        return <motion.div initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0}} 
                        transition={{ duration: .8, delay: delayTime }} 
                        className="gallery-img-container flex-box" 
                        onClick={() => handleImageClick(image)}
                        key={image.id}>
                        <div className="gallery-img">
                            <img src={image.img_url} alt="image" className="center-img"/>
                        </div>
                    </motion.div>
                    })}
                </div>
            </div>
            <Pagination totalImages={totalImages} imagesPerPage={imagesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} handlePages={handlePages}/>

            {isImagePopUp ?
                <div className="image-pop-up">
                    <motion.div
                    initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: .5 }}
                    className="image-pop-up-container" 
                    ref={imagePopUpRef}>
                        <img src={selectedImage.img_url} alt="image" />
                    </motion.div>
                </div>
                :
                <div ref={imagePopUpRef}></div>
            }

            <Footer />
        </div>
    )
}