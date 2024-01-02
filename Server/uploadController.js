const {RecursiveCharacterTextSplitter} = require("Langchain/text_splitter");
const {OpenAIEmbeddings}= require("Langchain/embeddings/openai"); 
const {FaissStore} = require("Langchain/vectorstores/faiss");
const {ChatOpenAI} = require('Langchain/chat_models/openai');
const {RetrievalQAChain} = require('Langchain/chains');
const Question = require('./database/Question')

const fs = require('fs');

exports.embeding = async(req, res) =>{
    try {
        const text = fs.readFileSync("/Users/HP/Desktop/AI-PDF_Reader/Server/uploads/test.pdf", "utf-8");
        const text_splitter = new RecursiveCharacterTextSplitter(
          chunk_size=1000
        );
        const docs = await text_splitter.createDocuments([text]);

        const embeddings =  new OpenAIEmbeddings();
        const vectorstore= FaissStore.fromDocuments (docs, embeddings);

        (await vectorstore).save("faiss_index_react");
        res.send({msg:'embeding done'})
        console.log('embeding done');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error embedding' });
    }
  const text = fs.readFileSync("/Users/HP/Desktop/AI-PDF_Reader/Server/uploads/test.pdf", "utf-8");
  const text_splitter = new RecursiveCharacterTextSplitter(
    chunk_size=1000
  );
  const docs = await text_splitter.createDocuments([text]);

  const embeddings =  new OpenAIEmbeddings();
   const vectorstore= FaissStore.fromDocuments (docs, embeddings);
  
  (await vectorstore).save("faiss_index_react");
  res.send({msg:'embeding done'})
  console.log('embeding done');
};
  
exports.retrival = async (req, res) => {
  try {
    console.log('in the retrival', req.body);

    const question = req.body.question;

    const embeddings = new OpenAIEmbeddings();
    const new_vectorstore = await FaissStore.load("/Users/HP/Desktop/AI-PDF_Reader/Server/faiss_index_react", embeddings);
    const vectorStoreRetriever = new_vectorstore.asRetriever();

    const model = new ChatOpenAI({ temperature: 1, model_name: "gpt-3.5-turbo" });

    const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

    response = await chain.call({
      query: question,
    });

    const finalResponse = response.text;
    console.log('finalResponse', finalResponse);
    console.log(' req.body.userid', req.body.userid);
    const userid = req.body.userid;

    const newQuestion = new Question({ question, finalResponse, userid });
    await newQuestion.save();

    res.send({ data: response });

    console.log('up47', response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error in retrieval' });
  }
};


