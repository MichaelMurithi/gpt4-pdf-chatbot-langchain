const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className='m-auto p-4'>
			<a href='https://twitter.com/murithi_myke'>&copy; My GPT {year}</a>
		</footer>
	);
};

export default Footer;
