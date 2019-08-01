function hash(txt) 
{
	var hash = 0, i, chr;
	if (txt.length === 0) return hash;
	for (i = 0; i < txt.length; i++) 
	{
		chr   = txt.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}
$lib.Map("hash");
