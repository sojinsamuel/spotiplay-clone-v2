import Modal from './modal'

import useUploadModal from '@/hooks/use-upload-modal'

const UploadModal = () => {
   const uploadModal = useUploadModal()

   const onChange = (open: boolean) => {
      if (!open) uploadModal.onClose()
   }

   return (
      <Modal
         title='Add a song'
         description='Upload an mp3 file to add to your library.'
         isOpen={uploadModal.isOpen}
         onChange={onChange}>
         UploadModal
      </Modal>
   )
}

export default UploadModal
