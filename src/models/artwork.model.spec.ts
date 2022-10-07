import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';
import { ArtworkModel } from './artwork.model';

describe('ArtworkModel', () => {

    const getDefaultDate = 'getDefaultDate';
    
    it('determinateRecentLecture', () => {
        const artwork = new Artwork('HP1', 'Film');
        const artworkModelWithoutLecture = new ArtworkModel(artwork);
        const defaultDate = artworkModelWithoutLecture[getDefaultDate]();
        expect(artworkModelWithoutLecture.dateRecentLecture).toEqual(defaultDate);

        artworkModelWithoutLecture.determinateRecentLecture();
        expect(artworkModelWithoutLecture.dateRecentLecture).toEqual(defaultDate);

        const artworkModelWith1Lecture = new ArtworkModel(artwork);
        const lecture1 = new Lecture();
        artworkModelWith1Lecture.setLectures([lecture1]);
        expect(artworkModelWith1Lecture.dateRecentLecture.toISOString()).toEqual(lecture1.date);
        artworkModelWith1Lecture.determinateRecentLecture();
        expect(artworkModelWith1Lecture.dateRecentLecture.toISOString()).toEqual(lecture1.date);



        const artworkModelWith2Lecture = new ArtworkModel(artwork);
        const lecture2 = new Lecture();
        lecture2.date = new Date(2030, 1, 1, 0, 0, 1).toISOString();
        artworkModelWith2Lecture.setLectures([lecture1, lecture2]);
        expect(artworkModelWith2Lecture.dateRecentLecture.toISOString()).toEqual(lecture2.date);
        artworkModelWith2Lecture.determinateRecentLecture();
        expect(artworkModelWith2Lecture.dateRecentLecture.toISOString()).toEqual(lecture2.date);
    });
});
