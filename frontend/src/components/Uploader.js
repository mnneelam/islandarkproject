import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import TitleText from './TitleText'
import BodyText from './BodyText'
import IAPButton from './IAPButton'
import UploadForm from './UploadForm'
import ImgPreview from './ImgPreview'
import { scrollToElement } from '../helpers'

class Uploader extends React.Component {
  constructor () {
    super()
    this.uploadMedia = this.uploadMedia.bind(this)
    this.upload = this.upload.bind(this)
  }

  componentDidUpdate (prevProps) {
    // Move view to upload form if file was just uploaded
    if (!prevProps.uploadedMedia.info && !!this.props.uploadedMedia.info) {
      scrollToElement(this._uploadForm)
    }
  }

  uploadMedia (media) {
    return this.props.uploadMedia(media)
  }

  upload () {
    return this.props.upload(this.props.uploadedMedia)
  }

  render () {
    let uploadedMedia = this.props.uploadedMedia,
        resetStyle = {},
        info = this.props.uploadedMedia.info,
        preview

    if (uploadedMedia.files) {
      // Show preview of file if it is an image, otherwise show the file name
      // UX point to indicate that it has been uploaded
      let firstFile = uploadedMedia.files[0],
          moreFiles = uploadedMedia.files.length - 1

      if (/(image)/.test(firstFile.type)) {
        preview = <ImgPreview src={firstFile.preview} name={firstFile.name} moreFiles={moreFiles} height='50%'/>
      } else {
        preview = <h4 className='preview'>{firstFile.name} (+{moreFiles})</h4>
      }
    }

    // Once the file(s) have been uploaded, display a form to edit the info for submission
    let uploadForm = info ? <UploadForm
                              ref={(c) => this._uploadForm = c}
                              updateUploadInfo={this.props.updateUploadInfo}
                              {...info}
                            /> : null

    return (
      <section className='Uploader'>
        <TitleText>Upload Media</TitleText>
        <BodyText>
          Upload files and media, photos, documents, videos, anything.
        </BodyText>
        <div className='upload-area'>
          <Dropzone onDrop={this.uploadMedia} style={resetStyle} className='Dropzone'>
            <TitleText>Uploaded:</TitleText>
            {preview}
            <IAPButton className='upload-button'>Browse Files</IAPButton>
          </Dropzone>
          {uploadForm}
        </div>
        <IAPButton onClick={this.upload}>Submit</IAPButton>
      </section>
    )
  }
}

Uploader.propTypes = {
  uploadMedia: PropTypes.func.isRequired,
  uploadedMedia: PropTypes.shape({
    files: PropTypes.arrayOf(PropTypes.object),
    info: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      isPrivate: PropTypes.bool,
      location: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          lat: PropTypes.oneOfType([PropTypes.number, undefined]),
          lng: PropTypes.oneOfType([PropTypes.number, undefined])
        })
      ]).isRequired
    })
  }),
  updateUploadInfo: PropTypes.func.isRequired
}

export default Uploader
