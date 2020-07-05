import React from 'react'
import { PickOptionBox } from './VirtualRoomEditorComponents/PickOptionBox'
import {useRouter} from '../../routers/useRouter';


export default () => {
    const router = useRouter();
    return(
        <div className="container" id="virtualRoomEditor">
            <h1>Virtual Room Editor</h1>
            <div className="row fixed-center mobile-column">
                <PickOptionBox  title="Pick a template" 
                                subtitle="Pick ready on demend template and open your virtual room immidiatly"
                                onClick={() => router.push('/editor/template/pick')}/>
                <PickOptionBox  title="Create your own workout" 
                                subtitle="Setting your workout according to your plan and excersize for your students"
                                onClick={() => router.push('/editor/create')}/>
            </div>
        </div>
    )
}