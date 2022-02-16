export interface CardProps {
  articleId: string
  title: string
  time: string
  author: string
}
export interface HotWordsProps {
  hotWord: string
}

export enum searchTyps {
  input='input',
  hot = 'hot'
}
