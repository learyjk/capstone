import DirectoryItem from '../directory-item/directory-item.component';

import './directory.styles.scss';

const Directory = ({ categories }) => {
  return categories.map((category) => (
    <DirectoryItem
      key={category.id}
      category={category}
    />
  ))
}

export default Directory;