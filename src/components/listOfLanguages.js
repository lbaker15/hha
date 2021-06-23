import React from 'react';

const languages = ['Afrikaans', 'Albanian', 'Amharic', 'Arabic', 'Armenian',
'Azerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bosnian', 'Bulgarian',
'Catalan', 'Cebuano', 'Chichewa', 'Chinese', 'Corsican', 'Croatian',
'Czech', 'Danish', 'Dutch', 'Esperanto', 'Estonian', 'Filipino',
'Finnish', 'Frisian', 'Galician', 'Georgian', 'German', 'Greek',
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
        const {handlePreferredLang} = this.props;
        return (
            <React.Fragment>
                {languages.map((x, i) => {
                    let num = "languages_" + i;
                    return (
                        <label style={{userSelect: 'none'}}>
                            <input 
                            onChange={handlePreferredLang}
                            type="checkbox" name="languages" 
                            value={x} 
                            id={num}></input>
                            {x}
                            <br />
                        </label>
                    )
                })}

            </React.Fragment>
        )
    }
}

export default ListOfLanguages;