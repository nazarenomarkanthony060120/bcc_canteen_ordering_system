type GetItemCountType = {
  items: number
}

export const getItemCount = ({ items }: GetItemCountType) => {
  if (items > 1) {
    return `${items} items`
  } else {
    return `${items} item`
  }
}
