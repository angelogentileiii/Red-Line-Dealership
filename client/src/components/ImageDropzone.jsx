import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function ImageDropzone({ images, setImages }) {
    const [errorFiles, setErrorFiles] = useState([])

    // used as a callback the ondrop is for when files are uploaded
    const onDrop = useCallback(
      async (acceptedFiles, rejectedFiles) => {
        const remainingSlots = 5 - images.length;
        const imagesToAdd = acceptedFiles.slice(0, remainingSlots);

        setImages(prevImages => [
          ...prevImages, 
          ...imagesToAdd.map((image) => {
          return Object.assign(image, {preview: URL.createObjectURL(image) })
          })
        ]);
        setErrorFiles(rejectedFiles);
      },
      [images]
    );

    // methods to remove the items when clicking the remove button per file
    const removeImage = (name) => {
      setImages((prevImages) => prevImages.filter(img => img.name !== name))
    }
    const removeError = (name) => {
      setErrorFiles((prevErrorFiles) => prevErrorFiles.filter(file => file.file.name !== name))
    }

    // what to display when the images are correctly added
    const addedImages = images.map((img, index) => {
      return (
          <div 
            key={index} 
          >
            <img
            src={img.preview}
            alt={img.name}
            width={100}
            height={100} />
            <button type="button" onClick={() => removeImage(img.name)}>
              X
            </button>
          </div>
      )
    })

    // what to display for files that don't meet the criteria
    const erroredFiles = errorFiles.map(({file, errors}) => {
      return (
        <div key={file.name}>
          <h5>{file.name}</h5>
          <div>
            {errors.map(error => {
              return <p key={error.code}>{error.message}</p>
            })}
          </div>
          <button type="button" onClick={() => removeError(file.name)}>
            X
          </button>
        </div>
      )
    })

    // parameters for what to accept as files in dropzone
    const {getRootProps, getInputProps, isDragActive} = useDropzone({ 
      onDrop, 
      accept:{
      'image/jpeg': [],
      'image/png': []
      },
      maxSize: 2048 * 1024,
      maxFiles: 5
    })

    const addedImagesContainerStyle = {
      display: 'flex', // or 'grid' for grid layout
      flexDirection: 'row',
      justifyContent: 'space-between', // or other justify-content values
      alignItems: 'center', // or other align-items values
      flexWrap: 'wrap', // This allows images to wrap to the next line if needed
    };

    if (images.length < 5) {
      return (
        <>
          <div {...getRootProps()} 
            style={{
              margin: '0 auto',
              marginBottom: '10px',
              marginTop: '10px',
              height: '100px',
              border: "1pt dashed black",
              width: '95%',
              textAlign: 'center',
            }}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <>
                <p>Drop Images Here</p>
                <p>(Total of 5 Images)</p>
              </>
            ) : (
            <>
              <p>Click Here or Drag Images to Upload</p>
              <p>(Total of 5 Images)</p>
            </>
            )}
          </div>
          <div>
          {(addedImages.length > 0) ? (
              <h4 style={{flexDirection: 'row'}}>Images to Upload</h4>
            ) : (null)
            }
            <div 
              style={{
                display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'space-between', // or other justify-content values
                alignItems: 'center', // or other align-items values
                flexWrap: 'wrap'
              }}
            >
              {addedImages}
            </div>
          </div>
          <div>
            {(errorFiles.length > 0) ? (
              <h4>Incompatible Images</h4>
            ) : (null)
            }
            {erroredFiles}
          </div>
        </>
      )
    } else {
      return (
        <>
          <div>
            {(addedImages.length > 0) ? (
              <h4>Images</h4>
            ) : (null)
            }
            <div
              style={{
                display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'space-between', // or other justify-content values
                alignItems: 'center', // or other align-items values
                flexWrap: 'wrap'
              }}
            >
              {addedImages}
            </div>
          </div>
          <div>
            {(errorFiles.length > 0) ? (
              <h4>Errors</h4>
            ) : (null)
            }
            {erroredFiles}
          </div>
        </>
      )
    }
    
}

export default ImageDropzone