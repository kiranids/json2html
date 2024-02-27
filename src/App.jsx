import React, { useState } from 'react';
import { Modal, Button, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const App = () => {
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [appNo, setAppNo] = useState();

  const handleImageClick = (image, appNo) => {
    setAppNo(appNo);
    setCurrentImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      try {
        const jsonData = JSON.parse(content);
        setData(jsonData);
        message.success('File uploaded successfully.');
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        message.error('File upload failed.');
      }
    };

    reader.readAsText(file);
  };

  const draggerProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      handleFileUpload(file);
      return false; // Prevent default upload behavior
    },
  };

  return (
    <div>
      {/* Add File Upload */}
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
      </div>

      {/* Modal for Image Preview */}
      <Modal
        title={appNo ? `${appNo} ` : ''}
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        {currentImage && <img src={`data:image/png;base64, ${currentImage}`} alt="Preview" />}
      </Modal>

      {/* Display the data if available */}
      {data && (
        <div>
          <div className='flex mb-10'>
          <div className="w-1/2 bg-yellow-300">
  <div className="flex ">
    <div className="w-1/2 border-1 border-black">
      <p>
        <strong className='px-2'>JURISDICTION CODE:</strong> {data.jurisdictionCode}
      </p>
    </div>
    <div className="w-1/2 border-2 ">
     
    </div>
  </div>
  <div className="flex ">
    <div className="w-1/2 border-2">
    <p>
        <strong className='px-2'>Title:</strong> {data.title}
      </p>
   
    </div>
    <div className="w-1/2 border-2 ">
    <p>
        <strong className='px-2'>Total Pages:</strong> {data.numberOfPages}
      </p>
 
    </div>
  </div>
  

  <div className="flex ">
    <div className="w-1/2 border-2">
    <p>
        <strong className='px-2'>Publication Date:</strong> {data.publicationDate}
      </p>
    </div>
    <div className="w-1/2 border-2 ">
      <p>
        <strong className='px-2'>Total Records:</strong> {data.section.reduce((acc, section) => acc + section.trademarks.length, 0)}
      </p>
    </div>
  </div>
</div>
            <div className="w1/2"></div>
          </div>

          {data.section.map((section, index) => (
  <div key={index}>
    <h3>
      <h1 className="text-2xl text-gray-500 my-10">
        {index + 1}. {section.title}
      </h1>
    </h3>

    {section.trademarks.map((trademark, i) => (

        

      <div className='mb-10' key={i}>
        <h4>
          <strong>Trademark {i + 1}</strong>
        </h4>
        <p>
          <strong>Application Number:</strong> {trademark.applicationNumber}
        </p>
        <p>
          <strong>Application Date:</strong> {trademark.applicationDate}
        </p>
        <p>
          <strong>Registration Number:</strong> {trademark.registrationNumber}
        </p>
        <p>
          <strong>Verbal Elements:</strong>{' '}
          {trademark.verbalElements && trademark.verbalElements.join(',')}
        </p>

        {trademark?.owners?.map((owners, j) => (
            <div key={j}>
              {owners?.name && (<>
                   <strong>Owner's Name:</strong>
               <h1>{owners.name}</h1></>
              )}
            </div>
          ))}


          
        {trademark?.representatives?.map((representatives, j) => (
            <div key={j}>
              {representatives?.name && (<>
                   <strong>Owner's Name:</strong>
               <h1>{representatives.name}</h1></>
              )}

        {representatives?.address && (<>
                   <strong>Owner's Address:</strong>
               <h1>{representatives.address}</h1></>
              )}


        {representatives?.country && (<>
                   <strong>Owner's Country:</strong>
               <h1>{representatives.country}</h1></>
              )}
            </div>
          ))}

        

        <div className=' flex'>
          <Button
            className='bg-gray-400'
            onClick={() => handleImageClick(trademark.deviceElements[0], trademark.applicationNumber)}
          >
            View Trademark Device
          </Button>

          {trademark?.clippings?.map((clipping, j) => (
            <div key={j}>
              {clipping?.binaryContent && (
                
                <Button className='bg-gray-400 hover:text-white' onClick={() => handleImageClick(clipping.binaryContent, trademark.applicationNumber)}> View Clipping Image </Button>
              )}
            </div>
          ))}





        </div>
        {i < section.trademarks.length - 1 && <hr />}
      </div>

    ))}
  </div>
))}
                                                                       
          {/* Display additional content based on the uploaded data */}
                                  {/* <h3>Data from Uploaded JSON:</h3>
                         <pre>{JSON.stringify(data, null, 2)}</pre> */}
                                                                 </div>
                                                                     )}
                                                                 </div>
                                                                     );
                                                                     };
                                                                        
export default App;
