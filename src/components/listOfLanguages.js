import React from 'react';
import InputElement from './inputElement';

const languagesList = [
'Afrikaans', 'Albanian', 'Amharic', 'Arabic', 'Armenian',
'Azerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bosnian', 'Bulgarian',
'Catalan', 'Cebuano', 'Chichewa', 'Chinese', 'Corsican', 'Croatian',
'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Filipino',
'Finnish', 'French', 'Frisian', 'Galician', 'Georgian', 'German', 'Greek',
'Gujarati', 'Haitian Creole', 'Hausa', 'Hawaiian', 'Hebrew',
'Hindi', 'Hmong', 'Hungarian', 'Icelandic', 'Igbo', 'Indonesian',
'Irish', 'Italian', 'Japanese', ' Javanese', 'Kannada', 'Kazakh',
'Khmer', 'Kinyarwanda', 'Korean', 'Kurdish (Kurmanji)', 'Kyrgyz', 'Lao',
'Latin', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Macedonian',
'Malagasy', 'Malay', 'Malayalam', 'Maltese', 'Maori', 'Marathi',
'Mongolian', 'Myanmar (Burmese)', 'Nepali', 'Norwegian', 'Odia (Oriya)',
'Pashto', 'Persian', 'Polish', 'Portuguese', 'Punjabi', 'Romanian',
'Russian', 'Samoan', 'Scots Gaelic', 'Serbian', 'Sesotho', 'Shona',
'Sindhi', 'Sinhala', 'Slovak', 'Slovenian', 'Somali', 'Spanish',
'Sundanese', 'Swahili', 'Swedish', 'Tajik', 'Tamil', 'Tatar', 'Telugu',
'Thai', 'Turkish', 'Turkmen', 'Ukrainian', 'Urdu', 'Uyghur', 'Uzbek',
'Vietnamese', 'Welsh', 'Xhosa', 'Yiddish', 'Yoruba', 'Zulu'
]

class ListOfLanguages extends React.Component {
    render() {
        const {handlePreferredLang, editItem, languages} = this.props;
        return (
            <React.Fragment>
                {languagesList.map((x, i) => {
                    let check = (editItem) ? (editItem.languages.includes(String(x.toLocaleLowerCase()))) ? true : languages.includes(String(x.toLocaleLowerCase())) : languages.includes(String(x.toLocaleLowerCase()));
                    return (
                        <label 
                        key={x+i} style={i === languagesList.length-1 ? {userSelect: 'none', marginBottom: '50px'} : {userSelect: 'none'}}>
                            <InputElement 
                            selected={check}
                            handleChange={handlePreferredLang} 
                            value={x} i={i} 
                            id={"languages_" + i}
                            dataVal="languages"
                            />
                        </label>
                    )
                })}

            </React.Fragment>
        )
    }
}

export default ListOfLanguages;