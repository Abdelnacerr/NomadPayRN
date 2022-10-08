export interface SearchFacesByImageResponse {
  FaceMatches: [
    {
      Face: {
        BoundingBox: {
          Height: number;
          Left: number;
          Top: number;
          Width: number;
        };
        Confidence: number;
        ExternalImageId: 'string';
        FaceId: 'string';
        ImageId: 'string';
        IndexFacesModelVersion: 'string';
      };
      Similarity: number;
    },
  ];
  FaceModelVersion: 'string';
  SearchedFaceBoundingBox: {
    Height: number;
    Left: number;
    Top: number;
    Width: number;
  };
  SearchedFaceConfidence: number;
}
