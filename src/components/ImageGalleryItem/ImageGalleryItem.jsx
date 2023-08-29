import { Img } from './Image.GalleryItem.styled';
import { ModalWindow } from 'components/Modal/Modal';
import { useState } from 'react';

export const GalleryItem = ({ webformatURL, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Img src={webformatURL} alt="" onClick={openModal} />
      <ModalWindow
        largeUrl={largeImageURL}
        isModalOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};
