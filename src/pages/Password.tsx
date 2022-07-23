import { Button, Box, Text, CheckBox, TextInput, RangeInput, Tab, Tabs, RadioButtonGroup, Notification, Footer} from "grommet";
import { useState } from "react";
import DefaultTitledGrid from "../library/DefaultTitledGrid";
import { CreateRandomPassword } from "../utils/PasswordRandomPass";
import { CreateDictPassword } from "../utils/PasswordDictPass";
import { CSSProperties } from "react";
import { Book, FingerPrint, Github } from "grommet-icons";

const PasswordDisplay = (props : { password : string, coppied : any }) => {

    let headerSize = "xlarge"
    if ( props.password.length > 30) {
        headerSize = "large"
    }

    const styleBase = {fontFamily: 'monospace', overflow: 'wrap', textAlign: 'center', display: 'inline'} as CSSProperties
    
    const lowercase = (char : string) => {
        return <Text size={headerSize} style={{...styleBase, color:'black'}} >
            {char}
        </Text>
    }

    const uppercase = (char : string) => {
        return <Text size={headerSize} style={{...styleBase, color:'black'}} >
            {char}
        </Text>
    }

    const number = (char : string) => {
        return <Text size={headerSize} style={{...styleBase, color:'blue'}} >
            {char}
        </Text>
    }

    const symbol = (char : string) => {
        return <Text size={headerSize} style={{...styleBase, color:'magenta'}} >
            {char}
        </Text>
    }

    return <Box 
        margin={{vertical: 'medium'}} 
        pad={{vertical:'medium'}} 
        fill justify="center" 
        align="center" 
        overflow={'hidden'}
        direction="row"
        onClick={() => {
            navigator.clipboard.writeText(props.password)
            props.coppied();
        }}

        >

        { props.password.split('').map( (char, index) => {
            if ( char.match(/[a-z]/)) {
                return lowercase(char)
            } else if ( char.match(/[A-Z]/)) {
                return uppercase(char)
            } else if ( char.match(/[0-9]/)) {
                return number(char)
            } else {
                return symbol(char)
            }
        })}
    
    </Box>
}

export default function () {

    const [id, setId] = useState(0)
    const [count, setCount] = useState(4);
    const [length , setLength] = useState(16);
    const [prefix, setPrefix] = useState("");
    const [dash, setDash] = useState(false);
    const [merge, setMerge] = useState('-');
    const [uppercase , setUppercase] = useState(true);
    const [lowercase , setLowercase] = useState(true);
    const [numbers , setNumbers] = useState(true);
    const [special , setSpecial] = useState(true);
    const [tab, setTab] = useState(0);
    const [showCopy, setShowCopy] = useState(false);
    
    const randomPass = CreateRandomPassword({
        length: length,
        prefix: dash ? prefix + '-' : prefix,
        mustHaveUppercase: uppercase,
        mustHaveLowercase: lowercase,
        mustHaveNumber: numbers,
        mustHaveSpecial: special
    })

    const dictPass = CreateDictPassword({
        words: count,
        mergeWith: merge,
        replaceWithNumbers: numbers,
        replaceWithSymbols: special,
        replaceWithUppercase: uppercase
    })


    const Gap = () => {
        return <Box
            border={{side: 'bottom', color: 'light-4'}}
            style={{marginTop: '20px', marginBottom: '20px'}}
            justify="center"
        />
    }

    const RandomCharacterSet = (
        <Box margin={{vertical:'small'}} style={{minHeight: 'auto'}}> 
            <CheckBox pad={'small'} checked={uppercase}
                label="Require Uppercase"
                onChange={(event) => setUppercase(event.target.checked)}
            />
            <CheckBox pad={'small'} checked={lowercase}
                label="Require Lowercase"
                onChange={(event) => setLowercase(event.target.checked)}
            />
            <CheckBox pad={'small'} checked={special}
                label="Require Special"
                onChange={(event) => setSpecial(event.target.checked)}
            />
            <CheckBox pad={'small'} checked={numbers}
                label="Require Numeric"
                onChange={(event) => setNumbers(event.target.checked)}
            />
        </Box>
    )

    const RandomLength = (
        <Box style={{minHeight: 'auto'}} margin={{vertical:'medium'}}>
            <Text margin={{vertical: 'medium'}}>
                Password Length: {length}
            </Text>
            <RangeInput
                name="Password Length"
                max={40}
                min={12}
                value={length}
                onChange={event => setLength(+event.target.value)}
            />
        </Box>
    )

    const RandomPrefix = (
        <Box margin={{vertical:'medium'}} style={{minHeight: 'auto'}}> 
            <TextInput
                value={prefix}
                onChange={(event) => {
                    const value = event.target.value;
                    setPrefix(value);
                    if (prefix.length == 0 && value.length > 0) {
                        setDash(true);
                    }
                    if ( value.length == 0) {
                        setDash(false);
                    }
                }}
                placeholder="Prefix your password"
            />
            <CheckBox
                pad={'small'}
                checked={dash}
                label="Seperated by dash"
                onChange={(event) => {
                    if (prefix == "")
                        setPrefix("prefix");
                    setDash(event.target.checked)
                }}
            />
        </Box>
    )


    const DictionaryLength = (
        <Box style={{minHeight: 'auto'}} margin={{vertical: 'medium'}}>
            <Text margin={{vertical: 'medium'}}>
                Words: {count}
            </Text>
            <RangeInput
                name="Words"
                max={8}
                min={3}
                value={count}
                onChange={event => setCount(+event.target.value)}
            />
        </Box>
    )

    const DictionaryJoin = (
        <Box margin={{vertical:'small'}} style={{minHeight: 'auto'}}> 
            <Text margin={{vertical: 'small'}}>
                How to join words
            </Text>
            <RadioButtonGroup
                style={{marginTop: '10px'}}
                options={['none', 'dashes', 'underscores', 'dots']}
                value={merge}
                onChange={(event) => setMerge(event.target.value)} name={""}/>
        </Box>
    )

    const DictionarySpecial = (
        <Box  margin={{vertical:'small'}} style={{minHeight: 'auto'}}> 
            <CheckBox pad={'small'} checked={uppercase}
                label="Add Uppercases"
                onChange={(event) => setUppercase(event.target.checked)}
            />
            <CheckBox pad={'small'} checked={special}
                label="Add Special"
                onChange={(event) => setSpecial(event.target.checked)}
            />
            <CheckBox pad={'small'} checked={numbers}
                label="Add Numeric"
                onChange={(event) => setNumbers(event.target.checked)}
            />
        </Box>
    )

    return <div>
        <DefaultTitledGrid title={"Password Generator"}>

            { tab == 0 
                ? <PasswordDisplay password={randomPass} coppied={() => {setShowCopy(true)}} />
                : <PasswordDisplay password={dictPass} coppied={() => {setShowCopy(true)}} />
            }
            
            <Tabs style={{minHeight: 'auto'}} onActive={setTab}>
                <Tab title="Purely Random" icon={<FingerPrint />}>
                    { RandomLength }
                    <Gap/>
                    { RandomCharacterSet }
                    <Gap/>
                    { RandomPrefix }
                </Tab>
                <Tab title="Dictionary" icon={<Book />}>
                    { DictionaryLength}
                    <Gap/>
                    { DictionarySpecial}
                    <Gap/>
                    { DictionaryJoin }
                </Tab>
            </Tabs>
            
            <Box margin={{vertical: 'medium'}} fill height={'large'}>
                <Button primary label="Generate Again" onClick={() => setId(id + 1)}/>
            </Box>

            { showCopy && <Notification
                status="info"
                toast
                title="Coppied to clipboard"
                onClose={() => setShowCopy(false)}
            /> }

        </DefaultTitledGrid>
        <Box
            onClick={() => {
                window.open('https://github.com/eric-robert/create-for-me/tree/main/src/utils');
            }}
            style={{position: 'absolute', right: 0, bottom: 0}}
            flex direction="row"
            margin={'xxsmall'}>
                <Text size="small" margin={'xsmall'} style={{lineHeight: '20px'}}>
                    View Source
                </Text>
                <Box margin={'xsmall'}>
                    <Github />
                </Box>
            </Box>
    </div>
}

