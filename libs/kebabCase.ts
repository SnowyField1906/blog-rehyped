import { slug } from 'github-slugger'

const kebabCase = (str: string): string => {
    return slug(str) || str
}

export default kebabCase
