export default query => {
	const DOM = document.querySelectorAll(query)
	return DOM.length === 1 ?
		DOM[0] : [...DOM]
}