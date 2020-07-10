declare namespace tei="http://www.tei-c.org/ns/1.0"; 

declare function local:countHist($node as node()) {
    count($node//*[@ana='#hist'])
};

declare function local:countCrossref($node as node()) {
    count($node//*[@ana='#cross-ref'])
};

declare function local:countCogn($node as node()) {
    count($node//*[@ana='#cogn'])
};

declare function local:countInterp($node as node()) {
    count($node//*[@ana='#interp'])
};

declare function local:countCp($node as node()) {
    count($node//tei:persName[@ana='#cross-ref'])
};

declare function local:countHp($node as node()) {
    count($node//tei:persName[@ana='#hist'])
};

(:declare function local:countPeople($nodes as node()*) as node()* {
    for $node in $nodes
        return
        typeswitch($node)
            case element(tei:persName[@ana='#hist'])
                return local:countCp($node)
            case element(tei:PersName[@ana='#hist'])
                return local:countHp($node)
};:)

declare function local:listTitle($nodes as node()*) as node()*  {
    for $node in $nodes 
    return <li><em>{$node/data()}</em></li>
};

declare function local:listQuote($nodes as node()*) as node()*  {
    for $node in $nodes 
    return <li>{$node/data()}</li>
};

(:declare function local:countLang($nodes as node()*) as node()* {
     for $node in $nodes
     return count($node)
         case $node//*[@xml:lang='it']
             return count($node//*[@xml:lang='it'])
     where $node//*[@xml:lang='ver-it']
         return count($node//*[@xml:lang='ver-it'])
     where $node//*[@xml:lang='ver-it']
         return count($node//*[@xml:lang='ver-it'])
     where $node//*[@xml:lang='ver-it']
         return count($node//*[@xml:lang='ver-it'])
     where $node//*[@xml:lang='ver-it']
         return count($node//*[@xml:lang='ver-it'])
    };:)
    
declare function local:countIt($node as node()) {
    count($node//*[@xml:lang='it'])
};

declare function local:countVer($node as node()) {
    count($node//*[@xml:lang='ver-it'])
};

declare function local:countLat($node as node()) {
    count($node//*[@xml:lang='lat'])
};

declare function local:countFr($node as node()) {
    count($node//*[@xml:lang='fr'])
};

declare function local:countEn($node as node()) {
    count($node//*[@xml:lang='en'])
};

declare function local:countGer($node as node()) {
    count($node//*[@xml:lang='de'])
};

(:for $title in doc("leggerezza.xml")//tei:title[@ana='#cross-ref']
    order by string-length($title/data())
    return <p>{$title/data()}</p>:)

(:let $titles := doc("leggerezza.xml")//tei:title[@ana='#cross-ref']
      return count($titles) :)
      
let $root := doc("leggerezza.xml")
return <html>
            <head>
             <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"/>
            <link rel="stylesheet" type="text/css" href="style.css"></link>
            <meta
                charset="UTF-8"/>
            </head>
             <body><div
                class="container">
                <div
                    class="row">
                    <div
                        class="col-sm-8"
                        style="margin-top: 3em; padding-right: 4em;">
                       <p>List of quotations from cross-references:</p>
                        <ul>
                        {
                            let $teiCit := $root//tei:quote
                            return local:listQuote($teiCit)
                        }
                        </ul>
                        
                    </div>
                    <div
                        class="col-sm-4"
                        style="margin-top: 3em;">
                        
                        <p>Overview of the interpretative fields:</p>
                        <ul>
                          <li>Historical elements: {local:countHist($root)}</li>
                          <li>Cross-referenced elements: {local:countCrossref($root)}</li>
                          <li>Cognitive elements: {local:countCogn($root)}</li>
                          <li>Interpretative elements: {local:countInterp($root)}</li>
                        </ul>
                        
                        <p>Overview of the languages used:</p>
                        <ul>
                          <li>Italian: {local:countIt($root)}</li>
                          <li>Vernacular Italian: {local:countVer($root)}</li>
                          <li>Latin: {local:countLat($root)}</li>
                          <li>French: {local:countFr($root)}</li>
                          <li>English: {local:countEn($root)}</li>
                          <li>German: {local:countGer($root)}</li>
                        </ul>
                        
                        <p>Type of people mentioned:</p>
                        <ul>
                          <li>Cross-referenced people: {local:countCp($root)}</li>
                          <li>Historical people: {local:countHp($root)}</li>
                        </ul>
                        
                        <p>List of titles of the works referenced in the lecture:</p>
                        <ul>
                        {
                            let $teiTitle := $root//tei:title[@ana='#cross-ref']
                            return local:listTitle($teiTitle)
                        }
                        </ul>
                    </div>
                </div>
            </div>
             </body>
       </html>

