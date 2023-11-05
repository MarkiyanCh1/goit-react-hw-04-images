import React from 'react'
import { useState } from 'react';
import ModalWindow from '../Modal/Modal';
import { Image } from './ImageGalleryItem.styles';

const ImageGalleryItem = ({ src, tags, img }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(prevState => !prevState);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
    return (
      <>
        <Image
          onClick={toggleModal}
          src={src}
          alt={tags}
        />
        <ModalWindow
          src={img}
          tags={tags}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        />
      </>
    );
  }


export default ImageGalleryItem
