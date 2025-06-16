const Notification = ({ message }) => {
	const styling = {
		color: 'red',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	}
	if (message === null || message === '') {
		return (
			null
		)
	}
	else {
		return (
			<div style={styling}>
				<strong>{message}</strong>
			</div>
		)
	}
}
export default Notification