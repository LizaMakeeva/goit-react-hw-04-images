import React, { useState } from 'react';
import { ModalOn } from 'components/Modal/Modal';
import { Wrapper, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = arrayImages => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { arrayData } = arrayImages;
  const srcData = arrayData.largeImageURL;
  const srcPrevview = arrayData.webformatURL;
  const altData = arrayData.tags;
  const idData = arrayData.id;
  return (
    <Wrapper key={idData}>
      <Image
        onClick={() => {
          setIsModalOpen(true);
        }}
        src={srcPrevview}
        alt={altData}
      />
      <ModalOn
        srcDataModal={srcData}
        altDataModal={altData}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </Wrapper>
  );
};
