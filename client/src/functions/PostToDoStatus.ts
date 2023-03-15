import { Items } from '../../types/data'
const url = 'https://nas.lightshowdepot.com/api/'

const PostToDoStatus = async (item: Items) => {
  const status = item.isDone
  item.isDone = !status
  fetch(url + '/item/' + item.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
}

export default PostToDoStatus
