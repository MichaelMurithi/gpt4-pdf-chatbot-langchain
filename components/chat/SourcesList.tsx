import { Document } from 'langchain/document';
import ReactMarkdown from 'react-markdown';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './accordion';

const SourcesList = ({ sourceDocs }: { sourceDocs: Document[] }) => {
	return (
		<div className='p-5'>
			<Accordion type='single' collapsible className='flex-col'>
				{sourceDocs.map((doc, index) => (
					<div key={`messageSourceDocs-${index}`}>
						<AccordionItem value={`item-${index}`}>
							<AccordionTrigger>
								<h3>Source {index + 1}</h3>
							</AccordionTrigger>
							<AccordionContent>
								<ReactMarkdown linkTarget='_blank'>
									{doc.pageContent}
								</ReactMarkdown>
								<p className='mt-2'>
									<b>Source:</b> {doc.metadata.source}
								</p>
							</AccordionContent>
						</AccordionItem>
					</div>
				))}
			</Accordion>
		</div>
	);
};

export default SourcesList;
