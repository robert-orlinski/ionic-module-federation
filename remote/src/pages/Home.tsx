import MessageListItem from '../components/MessageListItem';
import { useState } from 'react';
import { Message, getMessages } from '../data/messages';
import {
	IonButton,
	IonContent,
	IonHeader,
	IonList,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonTitle,
	IonToolbar,
	useIonViewWillEnter,
} from '@ionic/react';
import './Home.css';
import { Share } from '@capacitor/share';

const Home: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	useIonViewWillEnter(() => {
		const msgs = getMessages();
		setMessages(msgs);
	});

	const refresh = (e: CustomEvent) => {
		setTimeout(() => {
			e.detail.complete();
		}, 3000);
	};

	return (
		<IonPage id="home-page">
			<IonHeader>
				<IonToolbar>
					<IonTitle>Inbox</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonRefresher slot="fixed" onIonRefresh={refresh}>
					<IonRefresherContent></IonRefresherContent>
				</IonRefresher>

				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Inbox</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonList>
					{messages.map((m) => (
						<MessageListItem key={m.id} message={m} />
					))}
				</IonList>
			</IonContent>

			<IonButton
				size="small"
				onClick={async () => {
					await Share.share({
						title: 'See cool stuff',
						text: 'Really awesome thing you need to see right meow',
						url: 'http://ionicframework.com/',
						dialogTitle: 'Share with buddies',
					});
				}}
				style={{
					height: '45px',
				}}
			>
				Share
			</IonButton>
		</IonPage>
	);
};

export default Home;
