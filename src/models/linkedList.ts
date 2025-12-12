export type LinkedListItem = {
  value: string
  next?: LinkedListItem
}

export class LinkedList {
  head: LinkedListItem

  constructor(item: LinkedListItem) {
    this.head = item
  }

  public next(): LinkedListItem {
    this.head = this.head.next!
    return this.head
  }
}
