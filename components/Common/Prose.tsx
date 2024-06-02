import cn from '@libs/class'

const Prose = ({ as: Component = 'div', className, ...props }: any) => {
	return <Component className={cn(className, 'prose')} {...props} />
}

export default Prose
