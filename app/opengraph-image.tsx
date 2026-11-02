import { renderShareImage, shareImageSize } from './components/og/share-image';

export const alt = 'Dale Larroder, software engineer';
export const size = shareImageSize;
export const contentType = 'image/png';

export default function Image() {
	return renderShareImage({
		kicker: ['dale larroder', 'software engineer'],
		title: 'welcome to my playground on the web.',
		highlight: 'playground',
	});
}
