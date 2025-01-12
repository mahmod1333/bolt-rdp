import path from 'path'
    const ServerPage = (req,res)=>{
        res.sendFile(path.resolve("src/Pages","server","ServerPage","ServerPage.html"))
         }
         const ServerOnActivePage = (req,res)=>{
            res.sendFile(path.resolve("src/Pages","server","ServerOnActive","ServerOnActivePage.html"))
           }
    
           export {ServerPage,ServerOnActivePage}
