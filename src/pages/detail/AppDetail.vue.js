
import ImageList from './ImageList/ImageList'
import Zoom from './Zoom/Zoom'

export default (await import('vue')).defineComponent({
  name: 'Detail',

  components: {
    ImageList,
    Zoom
  }
})
