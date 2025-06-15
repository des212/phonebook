const Filter = ({ value, handler }) => {
	return (
		<div>
            filter shown with: <input className="filter-persons" value={value} onChange={handler} />
		</div>
	)
}
export default Filter